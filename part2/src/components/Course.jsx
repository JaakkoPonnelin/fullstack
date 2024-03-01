
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

export default Course