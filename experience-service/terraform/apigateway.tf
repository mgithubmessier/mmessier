# Authorizer lambda
data "aws_lambda_function" "experience_service_authorizer_lambda" {
  function_name = aws_lambda_function.experience_service_authorizer.function_name
}

resource "aws_apigatewayv2_authorizer" "experience_service_authorizer" {
  api_id           = aws_apigatewayv2_api.experience_service_api_gateway.id
  authorizer_type  = "REQUEST"
  identity_sources = ["$request.header.Authorization"]
  name             = "experience-service-authorizer"

  authorizer_payload_format_version = "2.0"
  authorizer_result_ttl_in_seconds  = 10
  enable_simple_responses           = false
  authorizer_uri                    = data.aws_lambda_function.experience_service_authorizer_lambda.invoke_arn
}

# sets up API Gateway 
resource "aws_apigatewayv2_api" "experience_service_api_gateway" {
  name          = "experience_service_api_gateway"
  protocol_type = "HTTP"

}

resource "aws_apigatewayv2_stage" "experience_service_api_gateway" {
  api_id = aws_apigatewayv2_api.experience_service_api_gateway.id

  name        = "experience_service_stage"
  auto_deploy = true

  # these are pretty brutal limits, but I just want to make sure this API never gets abused
  default_route_settings {
    throttling_burst_limit = 5
    throttling_rate_limit  = 5
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

resource "aws_apigatewayv2_integration" "experience_service" {
  api_id = aws_apigatewayv2_api.experience_service_api_gateway.id

  integration_uri    = aws_lambda_function.experience_service.invoke_arn
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
}


resource "aws_apigatewayv2_integration" "experience_service_authorizer" {
  api_id = aws_apigatewayv2_api.experience_service_api_gateway.id

  integration_uri    = aws_lambda_function.experience_service_authorizer.invoke_arn
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
}

# counts as both the /experiences and the /experiences/{experinceID} route 
# https://stackoverflow.com/questions/58346601/how-can-i-apply-an-authorizer-to-select-routes-in-my-api-gateway-proxy-integrati
resource "aws_apigatewayv2_route" "experience_service_GET" {
  api_id             = aws_apigatewayv2_api.experience_service_api_gateway.id
  authorization_type = "CUSTOM"
  route_key          = "GET /experiences/{experienceID}"
  target             = "integrations/${aws_apigatewayv2_integration.experience_service.id}"
  authorizer_id      = aws_apigatewayv2_authorizer.experience_service_authorizer.id
}

resource "aws_cloudwatch_log_group" "api_gw" {
  name = "/aws/api_gw/${aws_apigatewayv2_api.experience_service_api_gateway.name}"

  retention_in_days = 1
}

resource "aws_lambda_permission" "allow_experience_service_execution" {
  statement_id  = "AllowExecutionFromAPIGateway_ExperienceService"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.experience_service.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_apigatewayv2_api.experience_service_api_gateway.execution_arn}/*/*"
}


resource "aws_lambda_permission" "allow_experience_service_authorizer_execution" {
  statement_id  = "AllowExecutionFromAPIGateway_ExperienceServiceAuthorizer"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.experience_service_authorizer.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_apigatewayv2_api.experience_service_api_gateway.execution_arn}/*/*"
}
