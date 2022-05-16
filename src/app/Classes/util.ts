export class LocalDate {
    date: string;
    constructor() {
        var dateObj = new Date();
        var month =
            dateObj.getUTCMonth() + 1 < 10
                ? '0' + (dateObj.getUTCMonth() + 1)
                : dateObj.getUTCMonth() + 1; //months from 1-12
        var day =
            (dateObj.getUTCDate()+1) < 10
                ? '0' + (dateObj.getUTCDate()+1)
                : (dateObj.getUTCDate()+1);
        var year = dateObj.getUTCFullYear();

        this.date = year + '-' + month + '-' + day;
 
    }
}

export const filters=[
    {
        key:"job",
        title:"الوظائف",
        values:[]

    },
    {
        key:"acceptance",
        title:"نتيجة التقديم",
        values:["مقبول","مرفوض"]
    },
    {
        key:"degree",
        title:"ألشهادة",
        values:["بكالوريوس","دبلوم عالي","ماجستير","دكتوراه"]
    },
    {
        key:"isOfThreeCollegeRanks",
        title:"الثلاثة الاوائل على ألكليات",
        values:["نعم","كلا"]
    },
    {
        key:"isOfSpecialCareNeeds",
        title:"ذوي ألاحتياجات ألخاصة",
        values:["نعم","كلا"]
    }
]

export const instructions={
    instructions:[
        "هذه ألدرجات خاصة بمكون ألاقليات من المسيحيين والشيك فقط",
        "يجب ان يكون ألمتقدم حائز على شهادة ألبكالوريوس حسب الاختصاص ألمطلوب"

    ],
    score:{
        general:"يتم أحتساب درجة ألمتقدم حسبب قرار رئاسة الوزراء ألمرقن"

    },
    documents:{

    }

}
