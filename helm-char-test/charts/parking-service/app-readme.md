EASIER-AI is an Hybrid (Cloud/Edge) platform that facilitates to develop, measure, monitor and deploy your AI models. The platform facilitates the data science tasks and it is very focused on working on Hybrid Infrastructure and exploiting data generated by IoT: "Train in the cloud and deploy easily in your edge". The platform synchronizes Cloud and Edge, keeping your Edge always up to date to run always the best model.

This service allows to train a model for predictions about parking lots availability, based on a city's historical parking data. The model is trained using different deep learning architectures as: LSTM (Long Short-term memory) Network, Fully Connected Network or a Convolutional Neuronal Network. The data to train the model needs to be available using NGSI OnStreetParking observations (See more details about how the data is available on EASIER platform).

_*Repository:*_
    - https://gitlab.atosresearch.eu/ari/ioe-ai/trainer-parking
    - https://gitlab.atosresearch.eu/ari/ioe-ai/inference-parkingestimator
_*Link to documentation:*_ https://gitlab.atosresearch.eu/ari/ioe-ai/platform-deployment/wikis/just-landed-tutorial
_*Image name:*_
    - easierai/trainer-parking-estimator
    - easierai/parking-estimator
_*Data source:*_ parking.smartsantander.eu:8080
_*Data proto:*_ 
```json
{
    "id": string,
    "traffic_flow": int,
    "ratio": int
}
```
_*Resulting url:*_ parking.easier.ai:54701/predict/parking/{parking_spot_area}
_*etc etc:*_