# KubeConductor

The first day of development went well. I spun-up various services in Azure, set up a self-hosted agent for my CI/CD, and installed Terraform onto my system. I gained deeper knowledge of containers, container orchestration, and the tools that facilitate the defining and provisioning of cloud infrastructure.

This is how it went:

Self-hosted Ubuntu server: While not ideal nor easy, I had to go with a self-hosted machine since Azure Pipelines requires a 1-3 day waiting period for parallel jobs. Thankfully, Azure provides students with $100 of free credit each month. I was able to spin up an entire Resource Group consisting of a NSG inbound and outbound rules, a virtual network (vnet), and network interface completely for free!

Unfortunately, since the server was running Ubuntu, RDP-ing into the machine would be a little complicated. My alternative was to simply SSH into the machine, but I worried I lacked the technical knowledge to do the entirety of the machine configuration through the command line. After some research, I came found a Microsoft document that details how install and configure a desktop environment (xfce) and remote desktop (xrdp) on Linux VMs running Ubuntu. This solution ultimately allowed me to RDP to a Linux machine using my Linux machine (using Remmina). It was my first time configuring RDP from one Linux machine the another Linux machine.

**Success!**

![Self-hosted Ubuntu server setup](../../assests/img/image-2.webp)

CI/CD: Now it was time to connect my Azure Pipeline CI/CD to my Ubuntu agent! Again, there was some extra work involved since I was opting for the self-hosted agent. Namely, the extra work involved installing Azure agent 3.x software on the remote VM so that it can listen for Azure Pipelines jobs. Microsoft once again came through with some great documentation detailing how to install the 3.x agent software on the Ubuntu machine. Eventually, I was able to set the server to listen in on my Azure Pipeline CI/CD!

![CI/CD setup](../../assests/img//image-3.webp)

The final step was to actually run my CI/CD with my target Ubuntu machine. I made a simple YAML file targeting my agent pool that simply echos “Hello, World!”

```yaml
trigger:
- main

pool:
  name: SelfHostedUbuntu  # Self-hosted agent

steps:
- script: echo Hello, World!
  displayName: 'Run a one-line script'

- script: |
    echo Add other tasks to build, test, and deploy your project.
    echo See https://aka.ms/yaml
  displayName: 'Run a multi-line script'
```

I decided to host my CI/CD code on GitHub (here) since that’s what I’m most comfortable with. The README details my timeline for features.

Finally, the moment of truth. I ran the Azure pipeline and… success!

![Pipeline success - Run 1](../../assests/img//image-6.webp)
---
![Pipeline success - Run 2](../../assests/img//image-7.webp)

From the screenshots above, the two runs passed the pipeline and my agent is registering as online!

Terraform: Not much to report here for now. I installed Terraform onto my Linux machine running Pop!_OS 22.02, an Ubuntu-based operating system. Installation was smooth, simply using a few commands was enough to get Terraform running out-the-box:

```bash
sudo apt-get update && sudo apt-get install -y gnupg software-properties-common

wget -O- https://apt.releases.hashicorp.com/gpg | \
gpg --dearmor | \
sudo tee /usr/share/keyrings/hashicorp-archive-keyring.gpg > /dev/null

echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] \
https://apt.releases.hashicorp.com $(lsb_release -cs) main" | \
sudo tee /etc/apt/sources.list.d/hashicorp.list

sudo apt update
sudo apt-get install terraform
```

## Conclusion:
I spent the rest of the day learning about AKS, EKS, Kubernetes, and containers. I learned how Kubernetes is an orchestration service for containers and how Terraform can facilitate the defining and provisioning of cloud infrastructure using a declarative language. My next step is setting up a single-cluster Kubernetes environment using Azure and basic resources such as VPCs, subnets, IAM roles, and security groups. I’m still debating on whether to use a simple, dumb microservice or create some useful microservice-driven application. I plan on using Go for the microservice for its simplicity, quick startup time, static typing, and concurrency support.

Bye for now!

