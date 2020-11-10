---
title: Provider Example
permalink: /flutter/provider-cheatsheet
---
# Flutter UI State Management - Provider Example

This article is a quick guide how to use [Provider](https://pub.dev/packages/provider) for UI state management in Flutter.

## Update pubspec.yaml

Add provider package dependency to the pubspec.yaml:

```yaml
dependencies:
  flutter:
    sdk: flutter

  provider:
```

## Create Model

Create model class that encapsulates state of your UI. The model class should use ChangeNotifier as mixin or extend it. In both cases you get access to notifyListeners() method.

```dart
import 'package:flutter/foundation.dart';

class MyModel with ChangeNotifier {

  int _state;

  int get state => _state;

  void setState(int state) {
    _state = state;
    notifyListeners();
  }
}
```

Of course your model may have more state variables and methods - notifyListeners() must be invoked when model variables change to notify all listeners.

## Register Model

Wrap your base application widget into MultiProvider and register your model(s):

```dart
// ...
import 'package:provider/provider.dart';

class MyApp extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      
      providers: [
        ChangeNotifierProvider<MyModel>(create: (context) => MyModel()),
        // NOTE: you can register multiple models
      ],

      child: MaterialApp(
        home: HomePage(),
      ),
    );
  }
}
```

## Update or Listen to Model Changes in Widgets

Now you can use the model in any widget. Some widgets can update the model, others read it. A widget can update and read the model at the same time.

```dart
// widget that updates the model state
class SomeWidget extends StatelessWidget {
  
  @override
  Widget build(BuildContext context) {
    var model = Provider.of<MyModel>(context);

    return FlatButton(
      onPressed: () {
        model.setState(model.state + 1);
      },
      child: Text("Update State"),
    );
  }
}

// widget that consumes model state
class SomeOtherWidget extends StatelessWidget {
  
  @override
  Widget build(BuildContext context) {
    var model = Provider.of<MyModel>(context);
    return Text("State: $model.state"),
  }
}
```

Now when state of the model changes from anywere in your application build() method of all widgets that use the model will be invoked to rebuild them. Just make sure you don't update the model in the build() method itself. This will create a disaster - infinite loop of model changes and widget updates. I.e. you can see that I don't call model.setState() in the build() method, but in the onPressed() button handler.
