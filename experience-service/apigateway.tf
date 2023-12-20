# # Authorizer lambda
# data "aws_lambda_function" "sample_authorizer_lambda_resource" {
#   function_name = var.authorization_lambda_name
# }

# resource "aws_apigatewayv2_authorizer" "experience_service_authorizer" {
#   api_id                            = aws_apigatewayv2_api.lambda.id
#   authorizer_type                   = "REQUEST"
#   authorizer_uri                    = aws_lambda_function.experience_service.invoke_arn
#   identity_sources                  = ["$request.header.Authorization"]
#   name                              = "experience-service-authorizer"
#   authorizer_payload_format_version = "2.0"

# }

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
  # authorizer_id = aws_apigatewayv2_authorizer.experience_service_authorizer.id
}

resource "aws_apigatewayv2_route" "experience_service_GETONE" {
  api_id = aws_apigatewayv2_api.lambda.id

  route_key = "GET /experiences/{experienceID}"
  target    = "integrations/${aws_apigatewayv2_integration.experience_service.id}"
  # authorizer_id = aws_apigatewayv2_authorizer.experience_service_authorizer.id
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
