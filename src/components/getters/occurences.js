import moment from 'moment'

export default function (eventOccurences, eventId) {
  if (!eventOccurences || !eventId) {
    return
  }

  // filter
  const filteredOccurences = eventOccurences.filter(eo =>
    eo.eventId === eventId)

  // sort by dates
  if (filteredOccurences) {
    filteredOccurences.forEach(o => {
      o.beginningDatetimeMoment = moment(o.beginningDatetime)
    })
    filteredOccurences.sort((o1,o2) =>
      o1.beginningDatetimeMoment - o2.beginningDatetimeMoment)
  }

  // return
  return filteredOccurences
}
