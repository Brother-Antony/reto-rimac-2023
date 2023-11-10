export function calculateAge(birthDate) {
    const birthDateArray = birthDate.split('-')
    const birthYear = parseInt(birthDateArray[2], 10)
    const birthMonth = parseInt(birthDateArray[1], 10)
    const birthDay = parseInt(birthDateArray[0], 10)
  
    const today = new Date()
    const currentYear = today.getFullYear()
    const currentMonth = today.getMonth() + 1
    const currentDay = today.getDate()
  
    let age = currentYear - birthYear
  
    if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
        age--
    }
  
    return age
}