//---------------------- test matchesTeamSearch function ------------------------//
import { matchesTeamSearch } from './fetchAndFilterProjects'

// (1) test case function returns true
test ('matchesTeamSearch returns true when any item in project.teams includes teamSearch', () => {
  const project = {"teams": ["foo", "bar", "foobar"]}
  const teamSearch = "foobar"
  expect(matchesTeamSearch(project, teamSearch)).toBe(true)
})

//(2) test case function returns false
test ('matchesTeamSearch returns flase when no items in project.teams include teamSearch', () => {
  const project = {"teams": ["a", "b", "c"]}
  const teamSearch = "d"
  expect(matchesTeamSearch(project, teamSearch)).toBe(false)
})

//---------------------- test matchesTitleSearch function ------------------------//
import { matchesTitleSearch } from './fetchAndFilterProjects'

//(3) test case function returns true 
test ('matchesTitleSearch returns true when project.title.toLowerCase includes titleSearch', () => {
  const project = {"title": "Foo"}
  const titleSearch = "foo"
  expect(matchesTitleSearch(project, titleSearch)).toBe(true)
})

//(4) test case function returns flase
test ('matchesTitleSearch returns flase when project.title.toLowerCase does not include titleSearch', () => {
  const project = {"title": "Foo"}
  const titleSearch = "bar"
  expect(matchesTitleSearch(project, titleSearch)).toBe(false)
})

//--------------------------- test matchesTag function ---------------------------//
import { matchesTag } from './fetchAndFilterProjects'

//(5) test case function returns true 
test ('matchesTag reutrns true when any item in project.tags includes tag.name', () => {
  const project = {"attributes": ["a", "b"]}
  const tag = {"id": 1, "name": "a"}
  expect(matchesTag(project, tag)).toBe(true)
})

//(6) test case function returns flase
test ('matchesTag returns false when no items in project.tags include tag.name', () => {
  const project = {"attributes": ["a", "b"]}
  const tag = {"id": 1, "name": "c"}
  expect(matchesTag(project, tag)).toBe(false)
})

//--------------------------- test matchesTags (plural) function ---------------------------//
import { matchesTags } from './fetchAndFilterProjects'

//(7) test case function returns true
test('matchesTags returns true when any item in project.tags includes any item.name in tags', () => {
  const project = {"attributes": ["a", "b"]}
  const tags = [{"id": 1, "name": "a"}, {"id": 2, "name": "b"}]
  expect(matchesTags(project, tags)).toBe(true)
})

//(8) test case function returns false
test('matchesTags returns false when no items in project.tags include any item.name in tags', () => {
  const project = {"attributes": ["a", "b"]}
  const tags = [{"id": 1, "name": "a"}, {"id": 2, "name": "c"}]
  expect(matchesTags(project, tags)).toBe(false)
})

//--------------------------- test matchesSDG function ---------------------------//
import { matchesSDG } from './fetchAndFilterProjects'

//(9) test case function returns true
test('matchesSDG returns true when project.sdgs includes sdg', () => {
  const project = {"sdgs": ["a", "b"]}
  const sdg = "a"
  expect(matchesSDG(project, sdg)).toBe(true)
})

//(10) test case function returns false
test('matchesSDG returns false when project does not include sdg', () => {
  const project = {"sdgs": ["a", "b"]}
  const sdg = "c"
  const actualValue = matchesSDG(project, sdg)
  const expectedValue = false
  expect(actualValue).toBe(expectedValue)
})

//--------------------------- test matchesSDGs (plural) function ---------------------------//
import { matchesSDGs } from './fetchAndFilterProjects'

//(11) test case function returns true
test('matchesSDGs returns true when any item in project.sdgs includes any item in sdgs', () => {
  const project = {"sdgs": ["a", "b"]}
  const sdgs = ["a", "b"]
  expect(matchesSDGs(project, sdgs)).toBe(true)
})

//(12) test case function returns false
test('matchesSDGs returns false when no items in project.sdgs include any item in sdgs', () => {
  const project = {"sdgs": ["a", "b"]}
  const sdgs = ["a", "c"]
  expect(matchesSDGs(project, sdgs)).toBe(false)
})

// at this stage all pieces of the doesProjectMatch function are passed two tests ->
// 1. that returns true & 2. that returns false

// ---------------------------------------------------------------------------------------------------//
// ------------------------------ test doesProjectMatchFunction --------------------------------------// 


