# Good Name, Please!

## Reasonably Short

Take a look at the following class definition:

    class User {
        String userFirstName;
        String userLastName;
        Date userBirthDate;
    }

Field names are clean and self-explanatory. Right? But let's take a closer look at how this class is going to be used:

    var user = new User();

    user.userFirstName = "Thomas";
    user.userLastName = "Anderson";
    user.userBirthDate = Date.fromString("March 11, 1962");

Do you see the problem now? Word "user" is repeated way too frequently. Putting prefix "user" in each class member name was not a good idea. It's redundant. It doesn't make the code more readable. Let's fix that:

    class User {
        String firstName;
        String lastName;
        Date birthDate;
    }

    var user = new User();

    user.firstName = "Thomas";
    user.lastName = "Anderson";
    user.birthDate = Date.fromString("March 11, 1962");

Much better! Isn't it?

## Scope and Context

When naming your classes, functions or variables you should always think about the scope, in which they are going to be used. I'm talking about any scope: module, package, namespace, file, class, function, code block...

Imagine we need a class to describe an action. Each action has action taken details and information about the user who made it. Here it is:

    class Action {
        String taken;
        User user;
    }

    var action = new Action();
    action.taken = "stopped agent Smith";
    action.user = new User("Thomas Anderson");

Looks clean. Isn't it? But what if Action class has a method:

    String getFullDescription() {
        return taken + " - done by " + user;
    }
    
In this context it isn't quite clear what "taken" means. Word "taken" only makes sense when it is used in conjunction with the object name (as in "action.taken"), but not alone. You need to be creative to fix this issue. A better name would be "description":

    class Action {
        String description;
        User user;

        String getFullDescription() {
            return description + " - done by " + user;
        }
    }

    var action = new Action();
    action.description = "stopped agent Smith";
    action.user = new User("Thomas Anderson");

As you can see "description" works pretty well in all contexts.

## Too Verbose

So, single-letter identifiers are bad. Right? While this is true in general. But there are exceptions. I.e. there is nothing wrong about the following code:

    for (int i=0; i<items.length(); i++) {
        Item item = items[i];
        ...
    }

Giving "i" a better name, such as "index" or, may be even "itemIndex", will only make your source code unnecessary verbose, but isn't going to improve anything:

    for (int itemIndex=0; itemIndex<items.length(); itemIndex++) {
        Item item = items[itemIndex];
        ...
    }

Again, the reason "i" is perfectly fine here is because it is used inside the for-loop scope. It is the only loop counter and therefore the purpose of "i" is very clear and widely accepted.

Long variable names make long expressions, which are hard to understand. Take a look:

    float distance1 = sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));

    float distance2 = sqrt((point1x-point2x)*(point1x-point2x) + (point1y-point2y)*(point1y-point2y));

Probably none of the expressions above is ideal way to calculate distance between two points. But the point here is to demonstrate that long verbose names don't always improve readability.

When single-letter variables are ok:
- inside small/local scope, such as function body, loop
- when no external code can access this variable
- when this is widely accepted variable name for a given domain (i.e. "i" as loop counter)

## Conclusion

Prefer short names to long names, when it doesn't affect code readability. It is perfectly fine for local variables to have shorter names, while public/global scope variables - longer and more verbose names. Think about the context, in which the name will be used, to understand if it is too verbose or too short. Apply common sense and be creative sometimes!
