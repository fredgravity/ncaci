
let counter = 1
export default defineNuxtRouteMiddleware((to, from) => {
    
    const routeArray = [
        "/addArea",
        "/addDistrict",
        "/addAssembly",
        "/addMinistry",
        "/addTrainingItem",
        "/budgetItem",
        "/budget",
        "/addBudgetItem",
        "/addBudget",
        "/reportBudgetIncome",
        "/reportBudgetExpense",
        "/reportTithe",
        "/reportAllTithe",
        "/reportTitheCompare"
    ]

    
    if(to.path !== from.path  && counter == 1 && !routeArray.includes(to.path)){
        counter++
        
        return navigateTo(to.path)
    }else if(to.path == from.path  && counter == 1 && !routeArray.includes(to.path)){
        counter++
        
        return navigateTo(to.path)
    }else if(counter == 1){
        counter++
        
        return navigateTo('/dashboard')
    }



  })