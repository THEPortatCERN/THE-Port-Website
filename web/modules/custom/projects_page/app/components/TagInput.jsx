import React, { useCallback, useRef } from 'react';
import ReactTags from 'react-tag-autocomplete';
import "../styles/TagInput.css";
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
  
  return (
    <ReactTags
      ref={reactTags}
      tags={tags}
      suggestions={settings.attributes}
      onDelete={onDelete}
      onAddition={onAddition}
      tagComponent={tagComponent}
    />
  )
}

export default TagInput