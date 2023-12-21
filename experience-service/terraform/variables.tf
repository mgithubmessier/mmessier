# Input variable definitions

variable "aws_region" {
  description = "AWS region for all resources."

  type    = string
  default = "us-east-1"
}

variable "EXPERIENCE_API_KEY" {
    type        = string
    description = "This is the API key that is used as the authorization for experiences"
}
  