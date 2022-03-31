import React, { useCallback, useRef } from 'react';
import ReactTags from 'react-tag-autocomplete';
import settings from '../helper-functions/settings';

const TagInput = ({ searchObj, setSearchObj, setTags, tags }) => {
  const reactTags = useRef()

  const onDelete = useCallback((tagIndex) => {
    // set the tags to filter from 
    const newTagsList = tags.filter((_, i) => i !== tagIndex)
    setTags(newTagsList)
    // set the search object to build query string from
    const newTagNames = newTagsList.map(tag => tag.name)
    setSearchObj({...searchObj, tags_filter: [...newTagNames]})
  }, [setTags, tags])

  const onAddition = useCallback((newTag) => {
    // set the tags to filter from
    setTags([...tags, newTag])
    // set the search object to build query string from
    const prevTagNames = tags.map(tag => tag.name)
    const newTagNames = [...prevTagNames, newTag.name]
    setSearchObj({...searchObj, tags_filter: [...newTagNames]})
  }, [setTags, tags, setSearchObj, searchObj])

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
      placeholderText='Add tags'
    />
  )
}

export default TagInput