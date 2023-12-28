# Authorizer lambda
data "aws_lambda_function" "authorizer_service_lambda" {
  function_name = aws_lambda_function.authorizer_service.function_name
}

resource "aws_apigatewayv2_authorizer" "authorizer" {
  api_id           = aws_apigatewayv2_api.api_gateway.id
  authorizer_type  = "REQUEST"
  identity_sources = ["$request.header.Authorization"]
  name             = "experience-service-authorizer"

  authorizer_payload_format_version = "2.0"
  authorizer_result_ttl_in_seconds  = 0
  enable_simple_responses           = false
  authorizer_uri                    = data.aws_lambda_function.authorizer_service_lambda.invoke_arn
}

# sets up API Gateway 
resource "aws_apigatewayv2_api" "api_gateway" {
  name          = "matthewmessier_api_gateway"
  protocol_type = "HTTP"

}

resource "aws_apigatewayv2_stage" "api_gateway" {
  api_id = aws_apigatewayv2_api.api_gateway.id

  name        = "mmessier-api"
  auto_deploy = true

  # these are pretty brutal limits, but I just want to make sure this API never gets abused
  default_route_settings {
    throttling_burst_limit = 10
    throttling_rate_limit  = 10
  }

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


resource "aws_apigatewayv2_integration" "authorizer_service" {
  api_id = aws_apigatewayv2_api.api_gateway.id

  integration_uri    = aws_lambda_function.authorizer_service.invoke_arn
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
}

# Experience Service Integration and route declaration
resource "aws_apigatewayv2_integration" "experience_service" {
  api_id = aws_apigatewayv2_api.api_gateway.id

  integration_uri    = aws_lambda_function.experience_service.invoke_arn
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
}

resource "aws_apigatewayv2_route" "experience_service_GETALL" {
  api_id             = aws_apigatewayv2_api.api_gateway.id
  authorization_type = "CUSTOM"
  route_key          = "GET /experiences/list"
  target             = "integrations/${aws_apigatewayv2_integration.experience_service.id}"
  authorizer_id      = aws_apigatewayv2_authorizer.authorizer.id
}

resource "aws_apigatewayv2_route" "experience_service_GET" {
  api_id             = aws_apigatewayv2_api.api_gateway.id
  authorization_type = "CUSTOM"
  route_key          = "GET /experiences/{experienceID}"
  target             = "integrations/${aws_apigatewayv2_integration.experience_service.id}"
  authorizer_id      = aws_apigatewayv2_authorizer.authorizer.id
}

# Contact Service Integration and route declaration
resource "aws_apigatewayv2_integration" "contact_service" {
  api_id = aws_apigatewayv2_api.api_gateway.id

  integration_uri    = aws_lambda_function.contact_service.invoke_arn
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
}

resource "aws_apigatewayv2_route" "contact_service_POST" {
  api_id             = aws_apigatewayv2_api.api_gateway.id
  authorization_type = "CUSTOM"
  route_key          = "POST /contact"
  target             = "integrations/${aws_apigatewayv2_integration.contact_service.id}"
  authorizer_id      = aws_apigatewayv2_authorizer.authorizer.id
}

# Authentication Service Integration and route declaration
resource "aws_apigatewayv2_integration" "authentication_service" {
  api_id = aws_apigatewayv2_api.api_gateway.id

  integration_uri    = aws_lambda_function.authentication_service.invoke_arn
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
}

resource "aws_apigatewayv2_route" "authentication_service_POST" {
  api_id    = aws_apigatewayv2_api.api_gateway.id
  route_key = "POST /authenticate"
  target    = "integrations/${aws_apigatewayv2_integration.authentication_service.id}"
}

resource "aws_cloudwatch_log_group" "api_gw" {
  name = "/aws/api_gw/${aws_apigatewayv2_api.api_gateway.name}"

  retention_in_days = 1
}

# Peermissioning the API Gateway to call the Lambdas associated with each route
resource "aws_lambda_permission" "allow_experience_service_execution" {
  statement_id  = "AllowExecutionFromAPIGateway_ExperienceService"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.experience_service.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_apigatewayv2_api.api_gateway.execution_arn}/*/*"
}


resource "aws_lambda_permission" "allow_authorizer_service_execution" {
  statement_id  = "AllowExecutionFromAPIGateway_AuthorizerService"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.authorizer_service.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_apigatewayv2_api.api_gateway.execution_arn}/*/*"
}

resource "aws_lambda_permission" "allow_contact_service_execution" {
  statement_id  = "AllowExecutionFromAPIGateway_ContactService"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.contact_service.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_apigatewayv2_api.api_gateway.execution_arn}/*/*"
}

resource "aws_lambda_permission" "allow_authentication_service_execution" {
  statement_id  = "AllowExecutionFromAPIGateway_AuthenticationService"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.authentication_service.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_apigatewayv2_api.api_gateway.execution_arn}/*/*"
}
