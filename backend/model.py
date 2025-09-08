import torch
import torch.nn as nn
import torchvision.models as models

class MyCustomResNet(nn.Module):
    def __init__(self, num_classes=15):
        super(MyCustomResNet, self).__init__()
        # Load pre-trained ResNet50
        self.model = models.resnet50(weights=None)  # weights=None if you fine-tuned
        self.model.fc = nn.Linear(self.model.fc.in_features, num_classes)

    def forward(self, x):
        return self.model(x)
