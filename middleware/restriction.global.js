
let counter = 1
export default defineNuxtRouteMiddleware((to, from) => {
    
    const routeArray = [
        "/area/addArea",
        "/district/addDistrict",
        "/assembly/addAssembly",
        "/ministry/addMinistry",
        "/training/addTrainingItem",
        "/finance/budgetItem",
        "/finance/budget",
        "/finance/addBudgetItem",
        "/finance/addBudget",
        "/report/budgetIncome",
        "/report/budgetExpense",
        "/report/tithe",
        "/report/allTithe",
        "/report/titheCompare"
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

  