# sets up the s3 bucket that will receive the archive of the lambda function archive and its dependencies
resource "aws_s3_bucket" "authorizer_service_lambda_bucket" {
  bucket        = "authorizer-service-bucket"
  force_destroy = true
}

data "archive_file" "authorizer_service" {
  type = "zip"

  source_dir  = "${path.module}/../../dist/experience-service"
  output_path = "${path.module}/../../dist/experience-service-authorizer.zip"
  excludes    = ["service"]
}

resource "aws_s3_object" "authorizer_service" {
  bucket = aws_s3_bucket.authorizer_service_lambda_bucket.id

  key    = "experience-service-authorizer.zip"
  source = data.archive_file.authorizer_service.output_path

  etag = filemd5(data.archive_file.authorizer_service.output_path)
}


# sets up the lambda function itself that will make use of the archive deployed to the s3 bucket above
resource "aws_lambda_function" "authorizer_service" {
  function_name = "AuthorizerService"

  s3_bucket = aws_s3_bucket.authorizer_service_lambda_bucket.id
  s3_key    = aws_s3_object.authorizer_service.key

  runtime = "nodejs20.x"
  handler = "src/authorizer/index.handler"

  source_code_hash = data.archive_file.authorizer_service.output_base64sha256

  role = aws_iam_role.authorizer_service_lambda_exec.arn
  environment {
    variables = {
      AUTHORIZER_API_KEY = var.AUTHORIZER_API_KEY
    }
  }
}

resource "aws_cloudwatch_log_group" "authorizer_service" {
  name = "/aws/lambda/${aws_lambda_function.authorizer_service.function_name}"

  retention_in_days = 1
}

resource "aws_iam_role" "authorizer_service_lambda_exec" {
  name = "authorizer_service_lambda"

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
resource "aws_iam_policy" "authorizer_service_cloudwatch_policy" {
  name        = "cloudwatch-matthewmessier.com-experience-service-authorizer-service"
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

resource "aws_iam_role_policy_attachment" "authorizer_service_cloudwatch_policy" {
  role       = aws_iam_role.authorizer_service_lambda_exec.name
  policy_arn = aws_iam_policy.authorizer_service_cloudwatch_policy.arn
}
