output "function_name" {
  description = "Name of the Lambda function."

  value = aws_lambda_function.experience_service.function_name
}

output "stage_url" {
  description = "Base URL for API Gateway stage."

  value = aws_apigatewayv2_stage.api_gateway.invoke_url
}

output "AUTHORIZER_API_KEY" {
  value = var.AUTHORIZER_API_KEY
}