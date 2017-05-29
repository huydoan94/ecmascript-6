import CourseGreeter from './course-greeter'

const greeter = new CourseGreeter('ES6 and Beyond')

document.getElementById('greeting-msg').innerHTML = greeter.getGreetingMsg()
