---
  id: 1
  category: "coding"
  Title: "How to Configure SSL on Aliyun DNS for an AWS Application Load Balancer for $0"
  created_at: "2020-03-23T07:18:49.814Z"
  updated_at: "2021-03-04T10:00:18.220Z"
  title: "How to Configure SSL on Aliyun DNS for an AWS Application Load Balancer for $0"
  tags: 
    - "ssl"
    - "china"
    - "aws"
    - "aliyun"
    - "elastic beanstalk"
  description: null
  status: "published"
  summary: "Learn how to use AWS in China with SSL before getting frustrated out of your mind"
  author: "JT Houk"
  location: "Beijing"
  date: "2019-04-10"
  image: "https://paper-attachments.dropbox.com/s_FE03AF79DD5D2B4571A0D20307E1D8136366A315E0C734E505A94D8D66C6DDB0_1570259284829_alibaba.jpg"
  images: []

---
*In just 3 steps, go from an insecure http zero to an https hero using Aliyun and AWS.*

----------


![](https://paper-attachments.dropbox.com/s_FE03AF79DD5D2B4571A0D20307E1D8136366A315E0C734E505A94D8D66C6DDB0_1570259284829_alibaba.jpg)

## (Skippable) Preface

Web development in China isn’t always (or ever) very straightforward. If you’ve had the pleasure of navigating cloud service providers from behind the Great Firewall, you might be familiar with many platforms all promising a massive suite of services suspiciously reminiscent of their AWS counterparts, but not necessarily the same. Something which might be fairly straightforward on AWS, might be a horrifically different experience on the biggest cloud provider in China: Aliyun.

This article is a humble attempt at making one such simple and necessary service a little bit better for my fellow China-dwelling developers.
While it’s intended for those using an AWS Application Load Balancer, you can take a similar approach to uploading an Aliyun-generated SSL certificate to any server configuration you can upload a certification to.


## Step 1: Order a Certificate

Let’s first get a certificate by navigating to the aliyun console under the “SSL Certificates” tab in the sidebar.

![](https://cdn-images-1.medium.com/max/1600/1*c51xYwPWgTcJ5ny-rqQ5NQ.png)


We’ll choose the free option because we’re broke.

![](https://paper-attachments.dropbox.com/s_FE03AF79DD5D2B4571A0D20307E1D8136366A315E0C734E505A94D8D66C6DDB0_1570259325742_1IzJfSjOQiOVAyJfg0Hpi7w.png)


This page was auto-translated and might appear different on your own browser. It’s kinda wonky, but you can get to the free configuration by cycling through the options in either Symantec or GeoTrust providers.
Back to the “SSL Certificates” tab, complete the application process.

![](https://cdn-images-1.medium.com/max/1600/1*x7nnceJqkQycDxtWx_4hAg.png)



## Step 2: Verify the Certificate in Our DNS

Copy the TXT record information from the SSL Certificates page.

![](https://cdn-images-1.medium.com/max/1600/1*XKi0GCA94pstvTb9yhHbfQ.png)


Go to the “Alibaba Cloud DNS” tab and fill in the \_dnsauth record with the information from the certificate.

![](https://cdn-images-1.medium.com/max/1600/1*idbFZDZ9LUlLu_BrTNSNAw.png)


**Verify**.
This step might take over 10 minutes to succeed, so we can come back after we deploy our certificate. (Be patient, young one).

![](https://cdn-images-1.medium.com/max/1600/1*bbYSsaVvJ02WNbuLL2cNIQ.png)



## Step 3: Deploy to our ALB

Download the certificate and unzip the .key and .pem files.

![](https://paper-attachments.dropbox.com/s_FE03AF79DD5D2B4571A0D20307E1D8136366A315E0C734E505A94D8D66C6DDB0_1570259693132_1ufIvR2NyAAiTDmUxfozf8A.png)


If you aren’t using an ALB, you can still use these files to deploy to your current server configuration
Now’s the time to finally head over to AWS.
Go to the EC2 console and select the “Load Balancers” side tab. Then look for the “Listeners” tab and select “View/edit certificates”.

![](https://cdn-images-1.medium.com/max/1600/1*fhoBYennnUY7R6oADUrp6Q.png)


Name the certificate after your domain and copy/paste from the .key and .pem files.

![](https://paper-attachments.dropbox.com/s_FE03AF79DD5D2B4571A0D20307E1D8136366A315E0C734E505A94D8D66C6DDB0_1570266675854_9.png)


This should be good enough, but to ensure that the right certificate is being served by your ALB, set the default certificate to the one you’ve just uploaded.

![](https://cdn-images-1.medium.com/max/1600/1*QMB-NFDvDItHNnsTvmLfkQ.png)


**Bing Bam Boom**
Rinse and Repeat about once a year.

![](https://paper-attachments.dropbox.com/s_FE03AF79DD5D2B4571A0D20307E1D8136366A315E0C734E505A94D8D66C6DDB0_1570259358086_1ZknKzfQ8iXdprYvTCQbC6A.png)


**Note:**
Once your certificate has been issued, you can safely delete your \_dnsauth TXT records from Aliyun.


## Conclusion

Hopefully this article will help someone on their windy path to security on Chinese IAAS providers. Of course, feel free to reach out to me if you have any questions or suggest future topics for web development in China.


<Newsletter />
<Comments />