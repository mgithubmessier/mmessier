# sets up the s3 bucket that will receive the archive of the lambda function archive and its dependencies
resource "aws_s3_bucket" "experience_service_authorizer_lambda_bucket" {
  bucket = "experience-service-authorizer-bucket"
  force_destroy = true
}

data "archive_file" "experience_service_authorizer" {
  type = "zip"

  source_dir  = "${path.module}/../../dist/experience-service"
  output_path = "${path.module}/../../dist/experience-service-authorizer.zip"
  excludes    = ["service"] 
}

resource "aws_s3_object" "experience_service_authorizer" {
  bucket = aws_s3_bucket.experience_service_authorizer_lambda_bucket.id

  key    = "experience-service-authorizer.zip"
  source = data.archive_file.experience_service_authorizer.output_path

  etag = filemd5(data.archive_file.experience_service_authorizer.output_path)
}


# sets up the lambda function itself that will make use of the archive deployed to the s3 bucket above
resource "aws_lambda_function" "experience_service_authorizer" {
  function_name = "ExperienceServiceAuthorizer"

  s3_bucket = aws_s3_bucket.experience_service_authorizer_lambda_bucket.id
  s3_key    = aws_s3_object.experience_service_authorizer.key

  runtime = "nodejs20.x"
  handler = "src/authorizer/index.handler"

  source_code_hash = data.archive_file.experience_service_authorizer.output_base64sha256

  role = aws_iam_role.experience_service_authorizer_lambda_exec.arn
  # environment {
    
  # }
}

resource "aws_cloudwatch_log_group" "experience_service_authorizer" {
  name = "/aws/lambda/${aws_lambda_function.experience_service_authorizer.function_name}"

  retention_in_days = 1
}

resource "aws_iam_role" "experience_service_authorizer_lambda_exec" {
  name = "experience_service_authorizer_lambda"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Sid    = ""
      Principal = {
        Service = "lambda.amazonaws.com"
      }
      }
    ]
  })
}

# provides the experience service lambda with cloudwatch access
resource "aws_iam_policy" "experience_service_authorizer_cloudwatch_policy" {
  name        = "cloudwatch-matthewmessier.com-experience-service-authorizer"
  path        = "/"
  description = "Giving this lambda access to read and write cloudwatch logs"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Effect = "Allow"
        Resource : "arn:aws:logs:*:*:*"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "experience_service_authorizer_cloudwatch_policy" {
  role       = aws_iam_role.experience_service_authorizer_lambda_exec.name
  policy_arn = aws_iam_policy.experience_service_authorizer_cloudwatch_policy.arn
}