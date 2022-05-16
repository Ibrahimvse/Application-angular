import { Files } from "./Shared";
import { LocalDate } from "./util";

export class Application{
    Name:string="";
    Gender:string="";
    BirthDate:string=new LocalDate().date;
    idNumber:string="";
    address:string="";

    MaritialStatus:string="أعزب";
    NumberOfChilderen:number=0; 
    DateOfMarriage:string=new LocalDate().date;
    IsPartenerEmployeed:string="كلا";

    degree:string="";
    degreeDate:string=new LocalDate().date;
    degreeGPA:number=0;
    isOfThreeCollegeRanks:string="كلا"
    degreeRank:number=0;
    degreeCountry:string="";
    degreeUnivercity:string="";
    degreeCollege:string="";
    degreeDepartment:string="";
    degreeBranch:string="";
    degreeProfession:string="";

    dailyContract:contract=new contract();
    permanentContract:contract=new contract();

    isPpoliticalPrisonerssRelatives:string="كلا";
    isOfSpecialCareNeeds:string="كلا"
    isMartyrRelatives:string="كلا";
    isMinority:minority=new minority();

    Files:Files=new Files();
    job:Job=new Job();
    toFormData():FormData{
        var data=new FormData();
        data.append("Name",this.Name)
        data.append("BirthDate",this.BirthDate)
        data.append("Gender",this.Gender)
        data.append("idNumber",this.idNumber)
        data.append("address",this.address)

        data.append("MaritialStatus",this.MaritialStatus)
        data.append("DateOfMarriage",this.DateOfMarriage)
        data.append("NumberOfChilderen",this.NumberOfChilderen.toString())
        data.append("IsPartenerEmployeed",this.IsPartenerEmployeed)

        data.append("degree",this.degree)
        data.append("degreeDate",this.degreeDate)
        data.append("degreeGPA",this.degreeGPA.toString())
        data.append("degreeRank",this.degreeRank.toString())
        data.append("isOfThreeCollegeRanks",this.isOfThreeCollegeRanks)
        data.append("degreeCountry",this.degreeCountry)
        data.append("degreeUnivercity",this.degreeUnivercity)
        data.append("degreeCollege",this.degreeCollege)
        data.append("degreeDepartment",this.degreeDepartment)
        data.append("degreeBranch",this.degreeBranch)
        data.append("degreeProfession",this.degreeProfession)
        data.append("isPpoliticalPrisonerssRelatives",this.isPpoliticalPrisonerssRelatives)
        data.append("isMartyrRelatives",this.isMartyrRelatives)
        data.append("isOfSpecialCareNeeds",this.isOfSpecialCareNeeds)
        data.append("dailyContract",JSON.stringify(this.dailyContract));
        data.append("permanentContract",JSON.stringify(this.permanentContract))
        data.append("isMinority",JSON.stringify(this.isMinority));
        data.append("job",JSON.stringify(this.job))
        this.Files.appendFilesToForm(data);
        return data;
    }

    fromJson(response:any){
        this.Name=response.Name
        this.Gender=response.Gender;
        this.BirthDate=response.BirthDate;
        this.idNumber=response.idNumber
        this.address=response.address;
    
        this.MaritialStatus=response.MaritialStatus;
        this.NumberOfChilderen=response.NumberOfChilderen;
        this.DateOfMarriage=response.DateOfMarriage;
        this.IsPartenerEmployeed=response.IsPartenerEmployeed;
    
        this.degree=response.degree;
        this.degreeDate=response.degreeDate;
        this.degreeGPA=response.degreeGPA;
        this.degreeRank=response.degreeRank;
        this.degreeCountry=response.degreeCountry;
        this.degreeUnivercity=response.degreeUnivercity;
        this.degreeCollege=response.degreeCollege;
        this.degreeDepartment=response.degreeDepartment;
        this.degreeBranch=response.degreeBranch;
        this.degreeProfession=response.degreeProfession;
        this.isOfThreeCollegeRanks=response.isOfThreeCollegeRanks;
        this.isOfSpecialCareNeeds=response.isOfSpecialCareNeeds;
        this.dailyContract=response.dailyContract;
        this.permanentContract=response.permanentContract;
    
        this.isPpoliticalPrisonerssRelatives=response.isPpoliticalPrisonerssRelatives
        this.isMartyrRelatives=response.isMartyrRelatives;
        this.isMinority=response.isMinority;
        this.job=response.job;
    
        this.Files=new Files();

    }

}
class contract{
    isAvailable:string="كلا";
    office:string="";
    startDate:string=new LocalDate().date;
    endDate:String=new LocalDate().date;
}
class minority{
    isFromMinority:string="نعم";
    minorityKind:string="";
}
class Job{
    owner:string="";
    title:string="";
}