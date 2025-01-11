# Day Two of Developing KubeConductor

Day two of developing KubeConductor is officially done.

Today, I focused on configuring an Azure DevOps CI/CD pipeline to deploy an Azure Kubernetes Service (AKS) cluster using Terraform. I’ll touch on the hurdles encountered while provisioning the infrastructure and managing existing resources, as well as the steps taken to resolve them.

---

## The Code

My public repo can be found [here].

### `aks-cluster.tf`

This is the Terraform configuration file that provisions an Azure Kubernetes Service (AKS) cluster using the AzureRM provider.

```hcl
provider "azurerm" {
  features {}

  client_id       = var.client_id
  client_secret   = var.client_secret
  tenant_id       = var.tenant_id
  subscription_id = var.subscription_id
}

resource "azurerm_resource_group" "default" {
  name     = "terraform-aks-rg"
  location = "West US"
}

resource "azurerm_kubernetes_cluster" "default" {
  name                = "terraform-aks-cluster"
  location            = azurerm_resource_group.default.location
  resource_group_name = azurerm_resource_group.default.name
  dns_prefix          = "terraform-aks"

  default_node_pool {
    name            = "default"
    node_count      = 2
    vm_size         = "Standard_DS2_v2"
    os_disk_size_gb = 30
  }

  identity {
    type = "SystemAssigned"
  }

  role_based_access_control_enabled = true

  tags = {
    environment = "Development"
  }
}
```

---

### `variables.tf`

This Terraform configuration file defines a set of variables used in the `aks-cluster.tf` file to dynamically configure the Azure resources.

```hcl
variable "resource_group_name" {
  description = "Name of the Resource Group"
  default     = "terraform-aks-rg"
}

variable "client_id" {
  description = "The Client ID of the Service Principal"
}

variable "client_secret" {
  description = "The Client Secret of the Service Principal"
}

variable "tenant_id" {
  description = "The Tenant ID of the Azure Active Directory"
}

variable "subscription_id" {
  description = "The Subscription ID where the resources will be created"
}
```

---

### `versions.tf`

This file specifies the required Terraform and provider versions needed, ensuring compatibility and stability.

```hcl
terraform {
  required_version = ">= 0.14"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = ">= 2.56"
    }
  }
}
```

---

### `outputs.tf`

This file defines output variables for the infrastructure, though functionality is not implemented yet.

```hcl
output "kubernetes_cluster_name" {
  value = azurerm_kubernetes_cluster.default.name
}

output "resource_group_name" {
  value = azurerm_resource_group.default.name
}
```

---

## Initial Pipeline Configuration

My goal for today was to automate the provisioning of an AKS cluster using Terraform in an Azure DevOps pipeline. The basic setup included a self-hosted Ubuntu agent and a multi-step pipeline with the following stages:

1. **Terraform Init**: Initializes a new or existing Terraform configuration.
2. **Terraform Plan**: Generates an execution plan to show what changes Terraform will make to your infrastructure.
3. **Terraform Apply**: Applies the changes required to reach the desired state of the configuration.

Below is a screenshot of the steps passing the CI/CD pipeline, which runs on a self-hosted Ubuntu machine.

![CI/CD Success](../../assests/img/ac1oo3m9.bmp)
---

## Debugging Pipeline Environment Variables

To mirror real-world cloud infrastructure, I needed to handle secret values carefully (e.g., IDs, passwords). I used Azure Pipeline Group Variables to store sensitive information. My CI/CD pipeline fetches these variables at runtime, avoiding hard-coded values.

Terraform requires consistent environment variable mapping for Azure authentication. I encountered errors with variables like `client_id` and `subscription_id` not being recognized. To fix this, I standardized the variable mapping using the `TF_VAR_` prefix to align Terraform’s environment variables with Azure’s (`ARM_CLIENT_ID`, `ARM_CLIENT_SECRET`, etc.).

Here’s the updated YAML:

### Updated `azure-pipelines.yml`

```yaml
trigger:
  branches:
    include:
      - main

pool:
  name: "SelfHostedUbuntu"

variables:
  - group: Terraform-SP-Credentials

jobs:
  - job: "Deploy_AKS"
    displayName: "Provision AKS Cluster Using Terraform"
    steps:
      - checkout: self

      - script: |
          terraform --version
        displayName: "Verify Installed Terraform Version"

      - script: |
          terraform init
        displayName: "Terraform Init"
        workingDirectory: $(System.DefaultWorkingDirectory)/terraform
        env:
          ARM_CLIENT_ID: $(appId)
          ARM_CLIENT_SECRET: $(password)
          ARM_TENANT_ID: $(tenant)
          ARM_SUBSCRIPTION_ID: $(AZURE_SUBSCRIPTION_ID)
          TF_VAR_client_id: $(appId)
          TF_VAR_client_secret: $(password)
          TF_VAR_tenant_id: $(tenant)
          TF_VAR_subscription_id: $(AZURE_SUBSCRIPTION_ID)

      - script: |
          terraform plan -out=tfplan
        displayName: "Terraform Plan"
        workingDirectory: $(System.DefaultWorkingDirectory)/terraform

      - script: |
          terraform apply -auto-approve tfplan
        displayName: "Terraform Apply"
        workingDirectory: $(System.DefaultWorkingDirectory)/terraform
```

---

## Azure CLI Summary

Here are some Azure CLI commands I used today:

1. **Login to Azure Using Service Principal**:
   ```bash
   az login --service-principal -u <appId> -p <password> --tenant <tenant>
   ```

2. **Retrieve AKS Cluster Credentials**:
   ```bash
   az aks get-credentials --resource-group <resource_group_name> --name <kubernetes_cluster_name>
   ```

3. **Browse Kubernetes Dashboard**:
   ```bash
   az aks browse --resource-group <resource_group_name> --name <kubernetes_cluster_name>
   ```

4. **Create Service Principal**:
   ```bash
   az ad sp create-for-rbac --skip-assignment
   ```

---

## Takeaways

1. **State Management**: The pipeline deploys successfully if the resource group doesn’t exist but fails without state management.

2. **Pipeline Steps**: The pipeline provisions the AKS cluster but needs fixing for state management.

---

## Next Steps

- Implement a remote state backend for state management.
- Fix the CI/CD flow for both new and existing infrastructure.

Finally, a shoutout to my incredibly hard-working agent — SelfHostedUbuntu! Look at him chugging along, handling errors like a champ. 🛠️🚀

![Self-Hosted](../../assests/img//lpcciala.bmp)
