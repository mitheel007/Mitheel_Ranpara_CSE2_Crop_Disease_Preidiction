import os
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout

# Set paths
data_dir = r"C:/Users/hp/OneDrive/Desktop/mitheel/archive (5)/New Plant Diseases Dataset(Augmented)/New Plant Diseases Dataset(Augmented)/train"  # ✅ Folder where all class folders are stored
img_size = (128, 128)
batch_size = 32
epochs = 10

# Data preprocessing
train_datagen = ImageDataGenerator(rescale=1./255, validation_split=0.2)

train_generator = train_datagen.flow_from_directory(
    data_dir,
    target_size=img_size,
    batch_size=batch_size,
    class_mode='categorical',
    subset='training'
)

val_generator = train_datagen.flow_from_directory(
    data_dir,
    target_size=img_size,
    batch_size=batch_size,
    class_mode='categorical',
    subset='validation'
)
#python train_model.py

# Define the model
model = Sequential([
    Conv2D(32, (3,3), activation='relu', input_shape=(128,128,3)),
    MaxPooling2D(2,2),
    Conv2D(64, (3,3), activation='relu'),
    MaxPooling2D(2,2),
    Flatten(),
    Dense(128, activation='relu'),
    Dropout(0.5),
    Dense(train_generator.num_classes, activation='softmax')
])

model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

# Train and save the model
model.fit(train_generator, epochs=epochs, validation_data=val_generator)
model.save("plant_disease_model.keras")

print("✅ Model trained and saved as plant_disease_model.keras")
#model.save("plant_disease_model.keras")
#python train_model.py
