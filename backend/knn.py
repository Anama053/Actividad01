import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.neighbors import KNeighborsClassifier

def train_knn_classifier(file_path, test_size=0.2, random_state=42, n_neighbors=3):
    # Leer los datos del archivo CSV
    data = pd.read_csv(file_path)
    data = data.dropna()

    # Separar las características (features) de las etiquetas (labels)
    X = data[['weight', 'age', 'height']]
    y = data['size']  # Valor a predecir

    # Convertir las etiquetas categóricas a etiquetas numéricas
    le = LabelEncoder()
    y_encoded = le.fit_transform(y)

    # Dividir los datos en conjuntos de entrenamiento y prueba
    X_train, X_test, y_train, y_test = train_test_split(X, y_encoded, test_size=test_size, random_state=random_state)

    # Crear el modelo KNN
    knn = KNeighborsClassifier(n_neighbors=n_neighbors)

    # Entrenar el modelo
    knn.fit(X_train, y_train)

    return knn, le

def predict(knn, le, weight, age, height):
    # Crear un DataFrame con las características deseadas
    features = pd.DataFrame({
        'weight': [weight],
        'age': [age],
        'height': [height]
    })

    # Hacer predicciones
    y_pred = knn.predict(features)

    # Convertir las predicciones a las etiquetas originales
    y_pred_labels = le.inverse_transform(y_pred)

    return y_pred_labels[0]