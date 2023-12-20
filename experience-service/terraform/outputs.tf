output "function_name" {
  description = "Name of the Lambda function."

  value = aws_lambda_function.experience_service.function_name
}

output "stage_url" {
  description = "Base URL for API Gateway stage."

  value = aws_apigatewayv2_stage.experience_service_api_gateway.invoke_url
}

output "EXPERIENCE_API_KEY" {
  value = var.EXPERIENCE_API_KEY
}