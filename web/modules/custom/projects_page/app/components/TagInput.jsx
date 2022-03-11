import React, { useCallback, useRef } from 'react'
import ReactTags from 'react-tag-autocomplete'
import "../styles/TagInput.css"

const TagInput = ({ setTags, tags }) => {
  
  const suggestions = [
    { id: 1, name: "Human Rights" },
    { id: 2, name: "Food" },
    { id: 3, name: "Communication" },
    { id: 4, name: "Health" },
    { id: 5, name: "Infrastructure" },
    { id: 6, name: "Medical" },
    { id: 7, name: "Education" },
    { id: 8, name: "Hardware" },
    { id: 9, name: "Software" },
    { id: 10, name: "Enviromental" },
  ]

  const reactTags = useRef()

  const onDelete = useCallback((tagIndex) => {
    setTags(tags.filter((_, i) => i !== tagIndex))
  }, [setTags, tags])

  const onAddition = useCallback((newTag) => {
    setTags([...tags, newTag])
  }, [setTags, tags])

  const tagComponent = ({ tag, removeButtonText, onDelete }) => {
    return (
      <button type='button' title={removeButtonText} onClick={onDelete}>
        {tag.name}
      </button>
    )
  }
  
  return (
    <ReactTags
      ref={reactTags}
      tags={tags}
      suggestions={suggestions}
      onDelete={onDelete}
      onAddition={onAddition}
      tagComponent={tagComponent}
      placeholderText='Search by tag'
    />
  )
}

export default TagInput