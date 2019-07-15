const ServerSideResponseFormat = {
	/**
	 * 请求结果
	 * 0：请求失败、后台异常、业务异常等非正常结果
	 * 1：请求成功，数据正常返回
	 * 2：表单服务端验证不通过的信息
	 * 3：登录超时
	 */
    "httpResult": 1,
	/**
	 * 错误信息，仅在请求失败（httpResult:0）及表单验证不通过（httpResult:2）时必须输出内容，其他结果时输出空字符串：""
	 * 当请求结果为失败、异常等情况时(httpResult:0)，errorMessage节点将输出错误信息内容，必须为数组格式
	 * 当请求结果为表单验证不通过时(httpResult:2)，errorMessage节点将输出表单验证不通过的字段及提示信息内容，必须为数组格式
	 */
    "errorMessage": [{
        "code" : "302",
        "message" : "订单不存在"
    },{
		"code" : "name",
		"message" : "姓名不能超过20个字符"
    }],
	/**
	 * 请求成功后返回的结果总集，该节点为统一读取节点，开发人员仅获取该节点的子节点内容
	 * 正常请求后返回的内容都应在values节点下生成
	 */
    "values": {
		/**
		 * 普通数据节点输出
		 */
		"user": {
            "name": "zhangsan",
            "age": 18
        },
		/**
		 * grid表格结果集格式
		 */
		"gridResult":{
            //每页记录数
            "pageSize":10,
            //当前页
            "pageNumber":1,
            //总记录数
            "totalRow":3,
            //总页数
            "totalPage":1,
            "list":[
                {
                    "id":1,
                    "prop2":"",
                    "status":1,
                    "remark":"",
                    "prop1":"",
                    "statusName":"启用",
                    "description":"系统标题名称",
                    "value":"后台管理系统",
                    "prop3":"",
                    "code":"SYSTEM_CAPTION"
                },
                {
                    "id":12860,
                    "prop2":"2",
                    "status":1,
                    "remark":"2",
                    "prop1":"2",
                    "statusName":"启用",
                    "description":"定时任务开关",
                    "value":"0",
                    "prop3":"2",
                    "code":"SYSTEM_QUARTZ"
                },
                {
                    "id":12861,
                    "prop2":"3",
                    "status":1,
                    "remark":"3",
                    "prop1":"3",
                    "statusName":"启用",
                    "description":"3",
                    "value":"3",
                    "prop3":"3",
                    "code":"3"
                }
            ]
        }
    }
};