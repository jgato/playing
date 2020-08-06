## Running the trainer inside an EASIER instance 

In order to run the trainer on an EASIER instance you just need to configure very few parameters, as most of the configuration is prepared in the docker image of the trainers.
The specific `docker image` to be used is 🐳 [easierai/trainer-parking-estimator:1.0](https://hub.docker.com/r/easierai/trainer-parking-estimator) and the `service type` is a Job. Please take a look at this figure to check a complete configuration.

![alt text](./figs/trainer-config.png)

The environment variables you must configure are:

 * `TRAINING_RESULTS_ID`: use an unique id for your train. This id will be used later to see the results (for example in a Kibana Dashboard) and to get the produced model(s). In addition, it will be used in your inferencer to deploy the models.
 * `AREA_TO_TRAIN`: List of parking areas following [OnStreetParking](https://fiware-datamodels.readthedocs.io/en/latest/Parking/OnStreetParking/doc/spec/index.html), separated by comas, to train the model. By default, it will train all the available parking areas if no areas are provided.  
 * `INPUT_FEATURES`: list of features, separated by comas, to train the model. Example: ratio, free 
 * `PREDICTION_FEATURES`: list of features, separated by comas, that the model estimator will output. Example: ratio. 

In order to store the results on the MINIO repository, the environment variables `MINIO_ACCESS_KEY` (username) and `MINIO_SECRET_KEY` (password) ensure that the trainer has access to it. These keys are available through Kubernetes secrets config file. So, you only have to pass the file as Inject values from another Resource (as you can see in the figure above).

Finally, you can also configure the Node Schedulling rules to play about the hardware you need to make the train.


## Running the trainer with Kubernetes command line

TO BE DONE

The previous section, basically, uses Kuberentes to deploy a container over an EASIER instance, but using Rancher. You can directly use kubectl tool from Kubernetes for doing the same, but from a command line.


## Running the trainer with just docker

Finally, you can just run the docker container without an orchestrator but _it is not encouraged to do it this way_, unless you are an advanced user and only for development purposes. The trainer has been developed to be run in an EASIER instance, in the case you want to run it by your own, you will need a platform with: `ElasticSearch` database to access parking data and `MINIO` to store the train results and models. In addition, you will need to have Elasticsearch populated with a `DataManager` feeding the parking data with OnStreetParking specification. The command you will use to run the trainer is:


```
docker run -e ELASTIC_HOST=[$ELASTIC_HOST] -e ELASTIC_PORT=[$ELASTIC_PORT] -e MINIO_ACCESS_KEY=[$MINIO_ACCESS_KEY] -e MINIO_SECRET_KEY=[$MINIO_SECRET_KEY] -e MINIO_HOST=[$MINIO_HOST] -e MINIO_PORT=[$MINIO_PORT] -e TRAINING_RESULTS_ID=[$TRAINING_RESULTS_ID] -e INPUT_FEATURES=[$INPUT_FEATURES] -e PREDICTION_FEATURES=[$PREDICTION_FEATURES] -e AREA_TO_TRAIN=[$AREA_TO_TRAIN] --name trainer_parking_estimator easierai/trainer-parking-estimator:1.0  
``` 

As you can see, there are a few more variables you need to configure:

* ELASTIC_HOST: elasticsearch host IP or hostname.
* ELASTIC_PORT: elasticsearch port.
* MINIO_HOST: MINIO host IP or hostname.
* MINIO_PORT: MINIO port.
* MINIO_ACCESS: MINIO access key (username for the MINIO repository)
* MINIO_SECRET: MINIO secret key (password for the MINIO repository)

You can also add this piece of code in your docker-compose file:

...