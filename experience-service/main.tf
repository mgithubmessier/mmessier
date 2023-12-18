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

provider "aws" {
  region = var.aws_region
}

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