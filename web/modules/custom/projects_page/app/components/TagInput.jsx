import React, { useState, useEffect, useCallback, useRef } from 'react';
import ReactTags from 'react-tag-autocomplete';
import settings from '../helper-functions/settings';

const TagInput = ({ searchObj, setSearchObj, setTags, tags }) => {
  const [placeholer, setPlaceholder] = useState('')

  useEffect(() => {
    tags.length > 3 ? setPlaceholder('MAX 5!') : setPlaceholder('e.g. Medical')
  }, [tags])

  const reactTags = useRef()
  
  const onDelete = useCallback((tagIndex) => {
    // set the tags to filter from 
    const newTagsList = tags.filter((_, i) => i !== tagIndex)
    setTags(newTagsList)
    // set the search object to build query string from
    if(newTagsList.length > 0){
      const newTagNames = newTagsList.map(tag => tag.name)
      setSearchObj({...searchObj, tags_filter: [...newTagNames]})
    } else {
      const newSearchObj = Object.assign({}, searchObj)
      delete newSearchObj.tags_filter;
      setSearchObj(newSearchObj)
    }
  }, [setTags, tags, setSearchObj, searchObj])

  const onAddition = useCallback((newTag) => {
    if(tags.length < 5){
      // set the tags to filter from
      setTags([...tags, newTag])

      // set the search object to build query string from
      const prevTagNames = tags.map(tag => tag.name)
      const newTagNames = [...prevTagNames, newTag.name]
      setSearchObj({...searchObj, tags_filter: [...newTagNames]})
    }
  }, [setTags, tags, setSearchObj, searchObj])

  const tagComponent = ({ tag, removeButtonText, onDelete }) => {
    return (
      <button type='button' title={removeButtonText} onClick={onDelete}>
        {tag.name}
      </button>
    )
  }
  
  return (
    <div className='tag-input'>
      <label htmlFor="tag-input" className="form-label">Tags:</label>
      <ReactTags
      ref={reactTags}
      tags={tags}
      suggestions={settings.attributes}
      onDelete={onDelete}
      onAddition={onAddition}
      tagComponent={tagComponent}
      placeholderText={placeholer}
    />
    </div>
  )
}

export default TagInput