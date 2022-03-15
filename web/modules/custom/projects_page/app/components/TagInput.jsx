import React, { useCallback, useRef } from 'react';
import ReactTags from 'react-tag-autocomplete';
import settings from '../helper-functions/settings';


const TagInput = ({ setTags, tags }) => {
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
  
  console.log('suggestions list', settings.attributes)

  return (
    <ReactTags
      ref={reactTags}
      tags={tags}
      suggestions={settings.attributes}
      onDelete={onDelete}
      onAddition={onAddition}
      tagComponent={tagComponent}
      placeholderText='Search by tag'
    />
  )
}

export default TagInput