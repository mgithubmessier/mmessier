# based off of https://developer.hashicorp.com/terraform/tutorials/aws/lambda-api-gateway
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

  source_dir  = "${path.module}/../dist/experience-service"
  output_path = "${path.module}/../dist/experience-service.zip"
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
  handler = "src/index.handler"

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

resource "aws_iam_policy" "dynamodb_policy" {
  name        = "dynamodb-matthewmessier.com-experiences"
  path        = "/"
  description = "Giving this lambda access to read from the experiences table in dynamodb"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = ["dynamodb:Scan", "dynamodb:GetItem"]
        Effect = "Allow"
        Resource = "arn:aws:dynamodb:us-east-1:806003882405:table/matthewmessier.com-experiences"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_dynamoroles" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess"
}

resource "aws_iam_role_policy_attachment" "lambda_policy" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = aws_iam_policy.dynamodb_policy.arn
}

# sets up API Gateway 

resource "aws_apigatewayv2_api" "lambda" {
  name          = "experience_service_api_gateway"
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_stage" "lambda" {
  api_id = aws_apigatewayv2_api.lambda.id

  name        = "experience_service_stage"
  auto_deploy = true

  access_log_settings {
    destination_arn = aws_cloudwatch_log_group.api_gw.arn

    format = jsonencode({
      requestId               = "$context.requestId"
      sourceIp                = "$context.identity.sourceIp"
      requestTime             = "$context.requestTime"
      protocol                = "$context.protocol"
      httpMethod              = "$context.httpMethod"
      resourcePath            = "$context.resourcePath"
      routeKey                = "$context.routeKey"
      status                  = "$context.status"
      responseLength          = "$context.responseLength"
      integrationErrorMessage = "$context.integrationErrorMessage"
      }
    )
  }
}

resource "aws_apigatewayv2_integration" "experience_service" {
  api_id = aws_apigatewayv2_api.lambda.id

  integration_uri    = aws_lambda_function.experience_service.invoke_arn
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
}

resource "aws_apigatewayv2_route" "experience_service_GET" {
  api_id = aws_apigatewayv2_api.lambda.id

  route_key = "GET /experiences"
  target    = "integrations/${aws_apigatewayv2_integration.experience_service.id}"
}

resource "aws_apigatewayv2_route" "experience_service_GETONE" {
  api_id = aws_apigatewayv2_api.lambda.id

  route_key = "GET /experiences/{experienceID}"
  target    = "integrations/${aws_apigatewayv2_integration.experience_service.id}"
}

resource "aws_cloudwatch_log_group" "api_gw" {
  name = "/aws/api_gw/${aws_apigatewayv2_api.lambda.name}"

  retention_in_days = 1
}

resource "aws_lambda_permission" "api_gw" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.experience_service.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_apigatewayv2_api.lambda.execution_arn}/*/*"
}