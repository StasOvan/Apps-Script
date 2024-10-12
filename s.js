// ID главной (первой) таблицы
const ID = '1Qhumy4znL14EZa5Yx0zv06x3-quH1UlItNAvVfa3nmY';

function onEdit(e) {

  var range = e.range;
  var sheet = range.getSheet();
  var sheetName = sheet.getName();
  var editedRow = range.getRow();
  var editedCol = range.getColumn();

  if (editedCol !== 16 && editedCol !== 18 && editedCol !== 19) {
    e.source.toast('Разрешено редактировать только столбцы P, R и S.', '', 3);
    range.setValue(e.oldValue); // Revert the change
    return;
  }

  if (sheetName == 'ZAKAZI' && (editedCol == 16 || editedCol == 18 || editedCol == 19)) {
    
    var targetSheet = SpreadsheetApp.openById(ID).getSheets()[0];
    var stringColumn;

    switch (editedCol) {
      case 16: stringColumn = 'AA'; break;
      case 18: stringColumn = 'AC'; break;
      case 19: stringColumn = 'AD'; break;
    }

    targetSheet.getRange(stringColumn + editedRow).setValue(e.value);
    

    if (stringColumn == 'AD') {

      var date = new Date(sheet.getRange('S' + editedRow).getValue());
      var day = date.getDate();
      var month = date.getMonth() + 1; // Добавляем 1, так как в JavaScript месяцы начинаются с 0
      var year = date.getFullYear();
      
      var formattedDate = ('0' + day).slice(-2) + '.' + ('0' + month).slice(-2) + '.' + year;
      
      targetSheet.getRange(stringColumn + editedRow).setValue(formattedDate);

    }
      
  }

}