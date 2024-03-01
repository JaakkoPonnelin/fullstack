const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      <Courses courses={ courses } />
    </div>
  )
}

const Courses = ({ courses }) => (
  courses.map(course =>
    <Course
      key={course.id}
      course={course}
    />
  )
)

const Course = ({ course }) => {
  const total = course.parts.reduce(
    (a, part) => a + part.exercises, 0
    )

  return (
    <div>
      <h2>{course.name}</h2>
      {course.parts.map(part =>
        <PartDisplay
          key={part.id}
          courseName={part.name}
          exercises={part.exercises}
        />
      )}
      <b>total of {total} exercises</b>
    </div>
  )
}

const PartDisplay = ({ courseName, exercises }) => (
  <div>
    {courseName} {exercises}
  </div>
)

export default App