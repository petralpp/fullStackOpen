/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom"
import { useField } from "../hooks"

const CreateNew = (props) => {
  const { reset: resetContent, ...contentField } = useField('text')
  const { reset: resetAuthor, ...authorField}  = useField('text')
  const { reset: resetInfo, ...infoField } = useField('text')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: contentField.value,
      author: authorField.value,
      info: infoField.value,
      votes: 0
    })
    navigate('/')
  }

  const handleReset = (e) => {
    e.preventDefault()
    resetContent()
    resetAuthor()
    resetInfo()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...contentField} />
        </div>
        <div>
          author
          <input {...authorField} />
        </div>
        <div>
          url for more info
          <input {...infoField} />
        </div>
        <button type="submit">create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  )

}

export default CreateNew