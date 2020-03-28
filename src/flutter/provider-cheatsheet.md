# Provider Cheat Sheet

Provider library is a very popular way to manage states of your UI screens in Flutter. This is a very quick guide how to use it.

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

Of course your model can have more complex state with multiple variables and methods. In any case notifyListeners() must be invoked when model changes to update all UI widgets that use it.

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

## Use Model in Widgets

Now you can use registered models in any widget of your application. Some widgets can update model, others read it. A widget can also update and read the model at the same time.

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

When model changes build() method of every widget that uses the model is invoked to re-build affected widgets. 
