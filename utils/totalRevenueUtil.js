
export const totalRevenueUtil = async (getUser, data) => {
    
    console.log(data)
    console.log(getUser)

    if (getUser.role == "admin") {
        console.log(data)
        return data
      }

    if (getUser.role == "assembly") {
        let value = data.filter((res) => {
            return res.attributes.assembly == getUser.permission;
        });
        console.log(value)
        return value
    }

    if (getUser.role == "district") {
        let value = data.filter((res) => {
          return res.attributes.assembly.district == getUser.permission;
        });

        return value
    }

    if (getUser.role == "area") {
        let value = data.value.data.filter((res) => {
          return res.attributes.assembly.area == getUser.permission;
        });

        return value
      }

    return true
}