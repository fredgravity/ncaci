import {useLoginStore} from '~/stores/LoginStore'
let counter = 1

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
    "/report/titheCompare",
    "/user",
    "/user/register"
]

export default defineNuxtRouteMiddleware(async (to, from) => {
    const loginStore = useLoginStore()
    let getData = await useGetData('user')
    let user = getData.data
    loginStore.setUser(getData.data)

    
    if(counter == 1 && to.fullPath == '/'){
        if(user){
            counter++
            return navigateTo('/dashboard')
        }
        if(!user){
            counter++
            return navigateTo('/')
        }
    }

    if(counter == 1 && !routeArray.includes(to.fullPath)){
        counter++   
        return navigateTo(to.fullPath)
    }
    
    if(counter == 1 && routeArray.includes(to.fullPath)){
        
        if(user.role == 'admin' || user.role == 'user'){

            counter++
            return navigateTo(to.fullPath)
        }
        if(user.role !== 'admin' || user.role !== 'user'){
            
            counter++
            return navigateTo('/')
        }
        counter++  
        return navigateTo('/dashboard')
    }



  })

  