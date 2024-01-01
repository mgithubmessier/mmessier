# Input variable definitions

variable "aws_region" {
  description = "AWS region for all resources."

  type    = string
  default = "us-east-1"
}

variable "SENDGRID_SENDER_API_KEY" {
  type = string
}

variable "PERSONAL_EMAIL" {
  type = string
}

variable "SENDGRID_SINGLE_SENDER_EMAIL" {
  type = string
}

variable "AUTHENTICATION_JWT_SECRET" {
  type = string
}

