from knn import train_knn_classifier
from knn import predict
from flask import Flask, request, jsonify
import json

app = Flask(__name__)

knn, le = train_knn_classifier('backend/storage/dataset.csv')

@app.route('/predict', methods=['POST'])
def prediction_service():
    data = request.get_json()

    weight = data['weight']
    age = data['age']
    height = data['height']

    prediction = predict(knn, le, weight, age, height)

    data = {
        'size_predicted': prediction
    }

    response = app.response_class(
        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    response.headers.add('Content-Type', 'application/json')
    return response


if __name__ == '__main__':
    app.run(debug=True)