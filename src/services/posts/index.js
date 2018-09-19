/**
 * Created by chuck7 on 16/9/14.
 */

//写axios

// import api from '../index.js';
export default {
  getDraftList(tag){
    let queryObj = undefined;
    if(undefined !== tag){
      queryObj = {tag};
    }
    return queryObj;
  },
  getDraft(id){
    return 'drafts/'+id;
  },
  modifyDraftContent(id,content){
    return 'drafts/'+id,{content};
  },
  modifyDraftTitle(id,title){
    return 'drafts/'+id,{title};
  },
  modifyDraftTags(id,tags){
    return 'drafts/'+id,{tags};
  },
  createTags(tagName){
    return 'tags',{name:tagName};
  },
  getAllTags(){
    return 'tags';
  },
  createDraft(title){
    return 'drafts',{title:title};
  },
  publish(id){
    return 'publications',{draftId:id};
  },
  deleteDraft(id){
    return 'drafts/'+id;
  },
  searchTagWithWord(keyword){
    return 'tags',{'start-with':keyword};
  }
};
