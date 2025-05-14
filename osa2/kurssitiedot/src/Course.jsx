const Course = ({ course }) => {
    return(
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
      </div>
    );
}

const Header = ({ name }) => {
    return(
      <h2>{name}</h2>
    );
  }
  
const Content = ({ parts }) => {
    return(<>
            {parts.map(part => <Part key={part.id} part={part} />)}
        </>);
}

const Total = ({ parts }) => {
return(
    <p><b>Total of {parts.reduce((total, part) => total += part.exercises, 0)} exercises</b></p>
);
}

const Part = ({ part }) => {
return(
    <p>{part.name} {part.exercises}</p>
);
}

export default Course;