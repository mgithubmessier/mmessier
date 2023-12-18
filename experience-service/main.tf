# sets up terraform dependencies
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.31"
    }
    archive = {
      source  = "hashicorp/archive"
      version = "~> 2.4.0"
    }
  }
}

# declares cloud service provider
provider "aws" {
  region = var.aws_region
}

# sets up the s3 bucket that will receive the archive of the lambda function and its dependencies
resource "aws_s3_bucket" "lambda_bucket" {
  bucket = "experience-service-bucket"
  force_destroy = true
}

data "archive_file" "experience_service" {
  type = "zip"

  source_dir  = "${path.module}/../dist/experience-service/src"
  output_path = "${path.module}/../dist/experience-service/experience-service.zip"
}

resource "aws_s3_object" "experience_service" {
  bucket = aws_s3_bucket.lambda_bucket.id

  key    = "experience-service.zip"
  source = data.archive_file.experience_service.output_path

  etag = filemd5(data.archive_file.experience_service.output_path)
}

# sets up the lambda function itself that will make use of the archive deployed to the s3 bucket above
resource "aws_lambda_function" "experience_service" {
  function_name = "ExperienceService"

  s3_bucket = aws_s3_bucket.lambda_bucket.id
  s3_key    = aws_s3_object.experience_service.key

  runtime = "nodejs20.x"
  handler = "index.handler"

  source_code_hash = data.archive_file.experience_service.output_base64sha256

  role = aws_iam_role.lambda_exec.arn
}

resource "aws_cloudwatch_log_group" "experience_service" {
  name = "/aws/lambda/${aws_lambda_function.experience_service.function_name}"

  retention_in_days = 1
}

resource "aws_iam_role" "lambda_exec" {
  name = "serverless_lambda"

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

resource "aws_iam_role_policy_attachment" "lambda_policy" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}