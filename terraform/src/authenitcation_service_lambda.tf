# sets up the s3 bucket that will receive the archive of the lambda function archive and its dependencies
resource "aws_s3_bucket" "authentication_service_lambda_bucket" {
  bucket        = "authentication-service-bucket"
  force_destroy = true
}

data "archive_file" "authentication_service" {
  type = "zip"

  source_dir  = "${path.module}/../../dist/authentication-service"
  output_path = "${path.module}/../../dist/authentication-service.zip"
}

resource "aws_s3_object" "authentication_service" {
  bucket = aws_s3_bucket.authentication_service_lambda_bucket.id

  key    = "authentication-service.zip"
  source = data.archive_file.authentication_service.output_path

  etag = filemd5(data.archive_file.authentication_service.output_path)
}

# sets up the lambda function itself that will make use of the archive deployed to the s3 bucket above
resource "aws_lambda_function" "authentication_service" {
  function_name = "AuthenticationService"

  s3_bucket = aws_s3_bucket.authentication_service_lambda_bucket.id
  s3_key    = aws_s3_object.authentication_service.key

  runtime = "nodejs20.x"
  handler = "index.handler"

  source_code_hash = data.archive_file.authentication_service.output_base64sha256

  role = aws_iam_role.authentication_service_lambda_exec.arn

  environment {
    variables = {
      AUTHENTICATION_JWT_SECRET = var.AUTHENTICATION_JWT_SECRET
    }
  }
}

resource "aws_cloudwatch_log_group" "authentication_service" {
  name = "/aws/lambda/${aws_lambda_function.authentication_service.function_name}"

  retention_in_days = 1
}

resource "aws_iam_role" "authentication_service_lambda_exec" {
  name = "authentication_service_lambda"

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

# provides the lambda with cloudwatch access
resource "aws_iam_policy" "authentication_service_cloudwatch_policy" {
  name        = "cloudwatch-matthewmessier.com-authentication-service"
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

resource "aws_iam_role_policy_attachment" "authentication_service_cloudwatch_policy" {
  role       = aws_iam_role.authentication_service_lambda_exec.name
  policy_arn = aws_iam_policy.authentication_service_cloudwatch_policy.arn
}
