import React, { useCallback, useRef } from 'react'
import ReactTags from 'react-tag-autocomplete'
import "../styles/TagInput.css"

const TagInput = ({ setTags, tags }) => {
  
  const suggestions = [
    { id: 1, name: "Human rights" },
    { id: 2, name: "Food" },
    { id: 7, name: "Education" },
    { id: 8, name: "Food" },
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
    />
  )
}

export default TagInput