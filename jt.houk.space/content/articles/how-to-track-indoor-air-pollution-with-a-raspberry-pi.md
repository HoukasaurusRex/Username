---
  id: 7
  category: "coding"
  Title: null
  created_at: "2020-11-13T07:01:44.834Z"
  updated_at: "2021-02-19T10:18:22.505Z"
  title: "How to Track Indoor Air Pollution with a Raspberry Pi"
  tags: 
    - "coding"
    - "raspberrypi"
    - "projects"
    - "python"
    - "data science"
  description: null
  status: "published"
  summary: "Breathe better with this simple Raspberry Pi Python project. This is a good place to start if you're interested in data analytics and sensor reading."
  author: "JT Houk"
  location: "Beijing"
  date: "2020-11-13"
  image: "https://res.cloudinary.com/jthouk/image/upload/v1613708321/aqipi_a8f2a16357.jpg"
  images: 
    - 
      id: 24
      name: "aqipi.jpg"
      hash: "aqipi_a8f2a16357"
      sha256: null
      ext: ".jpg"
      mime: "image/jpeg"
      size: 208.02
      url: "https://res.cloudinary.com/jthouk/image/upload/v1613708321/aqipi_a8f2a16357.jpg"
      provider: "cloudinary"
      provider_metadata: 
        public_id: "aqipi_a8f2a16357"
        resource_type: "image"
      created_at: "2021-02-19T04:18:43.659Z"
      updated_at: "2021-02-19T04:18:43.676Z"
      alternativeText: ""
      caption: ""
      width: 2016
      height: 1008
      formats: 
        large: 
          ext: ".jpg"
          url: "https://res.cloudinary.com/jthouk/image/upload/v1613708322/large_aqipi_a8f2a16357.jpg"
          hash: "large_aqipi_a8f2a16357"
          mime: "image/jpeg"
          name: "large_aqipi.jpg"
          path: null
          size: 82.7
          width: 1000
          height: 500
          provider_metadata: 
            public_id: "large_aqipi_a8f2a16357"
            resource_type: "image"
        small: 
          ext: ".jpg"
          url: "https://res.cloudinary.com/jthouk/image/upload/v1613708323/small_aqipi_a8f2a16357.jpg"
          hash: "small_aqipi_a8f2a16357"
          mime: "image/jpeg"
          name: "small_aqipi.jpg"
          path: null
          size: 25.2
          width: 500
          height: 250
          provider_metadata: 
            public_id: "small_aqipi_a8f2a16357"
            resource_type: "image"
        medium: 
          ext: ".jpg"
          url: "https://res.cloudinary.com/jthouk/image/upload/v1613708323/medium_aqipi_a8f2a16357.jpg"
          hash: "medium_aqipi_a8f2a16357"
          mime: "image/jpeg"
          name: "medium_aqipi.jpg"
          path: null
          size: 51.01
          width: 750
          height: 375
          provider_metadata: 
            public_id: "medium_aqipi_a8f2a16357"
            resource_type: "image"
        thumbnail: 
          ext: ".jpg"
          url: "https://res.cloudinary.com/jthouk/image/upload/v1613708322/thumbnail_aqipi_a8f2a16357.jpg"
          hash: "thumbnail_aqipi_a8f2a16357"
          mime: "image/jpeg"
          name: "thumbnail_aqipi.jpg"
          path: null
          size: 7.63
          width: 245
          height: 123
          provider_metadata: 
            public_id: "thumbnail_aqipi_a8f2a16357"
            resource_type: "image"
      previewUrl: null

---
You ever wonder what's actually in the air you breathe every day? I've lived in Beijing for a few years now and I'm always running a couple of air purifiers in my home, but how well do they actually work? Sure some have built in sensors, but how accurate are they? Well with a little Python, a Raspberry Pi, and some moxie, we can find our own answers.

This will focus primarily on measuring [PM2.5](https://www.iqair.com/blog/air-quality/pm2-5) and [PM10](https://www.iqair.com/us/blog/air-quality/pm10) in the air and converting the values to an Air Quality Index ([AQI](https://en.wikipedia.org/wiki/Air_quality_index)). For measuring other harmful chemicals like Nitrogen Dioxide (NO2) or Carbon Monoxide (CO), see the "[Adding Sensors](#adding-sensors)" section at the end of the article

## Prerequisites

- [Raspberry Pi](https://www.raspberrypi.org/products/) Configured, [Headless](https://www.raspberrypi.org/documentation/configuration/wireless/headless.md) (I used a 3b, but anything with a USB port should do just fine, though built in wifi is recommended for portability) (~$35)
- [SDS011 PM Sensor](https://www.amazon.com/SDS011-Quality-Detection-Conditioning-Monitor/dp/B07FSDMRR5) (~$15)
- [Adafruit IO](https://io.adafruit.com/) Account (free) 

## Configure the Raspberry Pi

Now we can get down to business. Power up your Raspberry Pi, attach your sensor, and crack your knuckles emphatically.

### Setting up Adafruit IO

Create an account on [Adafruit IO](https://io.adafruit.com/). This is a great site to collect data streams and display them on custom dashboards. After you've created an account, let's create a couple of feeds. We'll need three: a pm2.5, a pm10, and a log feed (I named mine "beijing-twofive", "beijing-ten", and "logs" respectively). After that, you can either create a dashboard now or later and play around with how you want to display the data. This is how I have mine set up.

![Adafruit IO Dashboard](https://res.cloudinary.com/jthouk/image/upload/v1605250759/x4j2mf7ta1mdpdxpk6cy.jpg)

### Configure your Raspberry Pi

[Configure](https://www.raspberrypi.org/documentation/configuration/wireless/headless.md) your Raspberry Pi with the installers on the product website. Once configured with either Raspbian or a Linux distribution of your choice (this project should be compatible with most distributions, but it's only been tested on Debian, Raspbian, and MacOS), install the following dependencies:

- [Python3](https://www.digitalocean.com/community/tutorials/how-to-install-python-3-and-set-up-a-programming-environment-on-debian-10) (you can skip the virtual env setup for our purposes)
- [Git](https://www.digitalocean.com/community/tutorials/how-to-install-git-on-debian-10)

### Download the Code and Install Dependencies

SSH into your Raspberry Pi (or login if GUI is installed and open your terminal) and download the repo in your home directory:

```sh
git clone git@github.com:HoukasaurusRex/RaspberryPi-AQIPi.git
```

Then install the python dependencies:

```sh
pip3 install -r requirements.txt
```

### Configure ENV with Adafruit Keys and Feed Names

Retrieve your AdafruitIO username and key from the dashboard and add them to you env.

```sh
echo 'AIO_USERNAME="Hackerman"
AIO_KEY="aio_xXxXx"
CITY="beijing"
AIO_LOGS="logs"' > .env
```

Both `CITY` and `AIO_LOGS` are feed names created in the AdafruitIO dashboard.

### Run the Code

Now you can run the code. I like to use [screen](https://www.howtogeek.com/662422/how-to-use-linuxs-screen-command/) to save my terminal process to be accessible later, but you can just run it in your main shell as well.

```sh
screen -S aqipi
```

```sh
cd ~/RaspberryPi-AQIPi
chmod +x run.sh
sh run.sh
```

There won't be any output in your terminal, but you should be able to go to your AdafruitIO feeds and start seeing results!

### Sensor Placement

Standard advice for locating your sensor is that it should be outside and four metres above ground level. That’s good advice for general environmental monitoring; however, we’re not necessarily interested in general environmental monitoring – we’re interested in knowing what we’re breathing in.

Choose a location where you spend most of your time or where you might be particularly interested in the general air quality (e.g. in the kitchen or garage) and place your sensor in a safe place where it won't be affected by excessive moisture or humidity.

## Understanding the Code

```python
def read_data():
  pm_twofive_data = []
  pm_ten_data = []
  readings = 0

  # This will take 11 data samples and use the built in `statistics` module to upload a median value
  # to filter out excessive data spikes in the readings
  while readings < 11:
    data = []
    for index in range(0, 10):
      datum = ser.read()
      data.append(datum)

    # Convert the readings from bytes to ints and append to the array of data samples
    pm_twofive = int.from_bytes(b''.join(data[2:4]), byteorder='little') / 10
    pm_twofive_data.append(pm_twofive)
    pm_ten = int.from_bytes(b''.join(data[4:6]), byteorder='little') / 10
    pm_ten_data.append(pm_ten)
    readings += 1

    # Take a little break ☕️
    sleep(1)
  
  # Calculate the AQI from ppm^2 using the US EPA API table detailed in the section below
  # then upload to your AdafruitIO feeds using the Adafruit_IO SDK
  pm_twofive_aqi = calc_aqi('pm_twofive', median(pm_twofive_data))
  send_data('twofive', pm_twofive_aqi)
  pm_ten_aqi = calc_aqi('pm_ten', median(pm_ten_data))
  send_data('ten', pm_ten_aqi)
  return [pm_twofive_aqi, pm_ten_aqi]
```

### Converting PPM^2 to AQI

This is converting to the [US EPA AQI](https://en.wikipedia.org/wiki/Air_quality_index), in order to use a different standard, you might need to tweak the formula to fit your country's AQI model.

![US EPA AQI Formula: I = (I_high - I_low) / (C_high - C_low) * (C - C_low) + I_low](https://res.cloudinary.com/jthouk/image/upload/v1605257657/snz4jmfdnkdugzmxubus.png)

### Exponential Backoff

This repo implements an exponential backoff policy to retry connections after an exponentially longer period to account for common network errors or connection issues with your sensor.

```python
def exponential_backoff(n):
  return (2 ** n) + (random.randint(0, 1000) / 1000)
```

## Results

First testing against the air quality outside, make sure it seems to match up with [IQ Air's](https://www.iqair.com/air-quality-map) Air Quality Index. 

After a few weeks of running the sensor, it seems the sensors on my air purifiers would often underreport pm2.5 values by as much as 50% and were seldom correlated with each other. The Raspberry Pi on the other hand, filtering out for data spikes, seems to respond very reasonably to real world phenomena such as rising with the outdoor AQI and falling linearly when the purifiers are all left on high for a few hours. I have also learned how much barometric pressure differences will also increase the penetration of outdoor pollution to my home. Interestingly, poor kitchen ventilation also causes quite noticeable spikes in indoor air pollution!

I've been using this sensor a few months now and have since felt much more empowered with managing the quality of the air I breathe each day.

## Adding Sensors

This project can be easily extended by adding additional sensors, such as an Ozone (O3), Carbon Monoxide (CO), Nitrogen Dioxide (NO2), or any other harmful air pollutants that might be more relevant to your area. If you do, please let me know and I'd like to compare your findings and update the AQIPi repository to extend the project.

## Acknowledgements

Big thanks to Andrew Gregory from [raspberrypi.org](https://www.raspberrypi.org/blog/monitor-air-quality-with-a-raspberry-pi/) on his work providing the inspiration for this project.

<Newsletter />
<Comments />