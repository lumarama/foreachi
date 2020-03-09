# Provider Cheatsheet

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

Of course your model will most likely have more complex state with multiple variables and methods. While in all cases notifyListeners() must be invoked when model state changes. This will eventually update all UI widgets that uses the model.

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

Now you can get access to registered models in any widget of your application. Some widgets can update model state, others consume it. Also the same widget can update and consume the model state at the same time.

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

