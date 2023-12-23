

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
  cloud {
    organization = "mhashicorpmessier"
    workspaces {
      name = "mmessier-experience-service"
    }
  }
}

# declares cloud service provider
provider "aws" {
  region = var.aws_region
}

