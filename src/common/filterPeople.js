const filterPeople = (surnamePrefix, people) => 
    people.filter((person) => !surnamePrefix || person.surname.toLowerCase().startsWith(surnamePrefix.toLowerCase()));

export default filterPeople;