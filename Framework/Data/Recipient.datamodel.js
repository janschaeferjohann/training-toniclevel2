/**
 * Supporting functions for partners
 */
load("Scripts\\Base.js");


function deriveSalutatoryAddress($Partner, $documentLanguage) 
{
	if (FW_I18n.toLanguage($documentLanguage) == "de")
	{
		if (!$Partner.SalutatoryAddress || $Partner.SalutatoryAddress.isAbsent() || $Partner.SalutatoryAddress.isEmpty()) {
			if (!$Partner.Salutation || $Partner.Salutation.isAbsent() || $Partner.Salutation.isEmpty() || $Partner.Salutation == "Firma") {
				return "Sehr geehrte Damen und Herren";
			} 
			else {
				var name = "Sehr geehrte";
				if (("" + $Partner.Salutation).slice(0, 4) == "Herr") {
					name = name + "r Herr";
				}
				else if (("" + $Partner.Salutation).slice(0, 4) == "Frau") {
					name = name + " Frau";
				}
				if ($Partner.Title && !$Partner.Title.isEmpty()) {
					name = name + " " + $Partner.Title;
				}
				return name + " " + $Partner.Lastname;
			}
		} 
		else if (("" + $Partner.SalutatoryAddress).slice(0, 4) == "Herr") {
			return "Sehr geehrter " + $Partner.SalutatoryAddress;
		}
		else if (("" + $Partner.SalutatoryAddress).slice(0, 4) == "Frau") {
			return "Sehr geehrte " + $Partner.SalutatoryAddress;
		}
		else if (("" + $Partner.SalutatoryAddress).slice(0, 4) == "Sehr" || ("" + $Partner.SalutatoryAddress).slice(0, 4) == "Hall") {
			return $Partner.SalutatoryAddress;
		}
		else {
			return "Sehr geehrte(r) " + $Partner.SalutatoryAddress;
		}
	}
	else if (FW_I18n.toLanguage($documentLanguage) == "en")
	{
		if (!$Partner.SalutatoryAddress || $Partner.SalutatoryAddress.isAbsent() || $Partner.SalutatoryAddress.isEmpty()) {
			if (!$Partner.Salutation || $Partner.Salutation.isAbsent() || $Partner.Salutation.isEmpty() || $Partner.Salutation == "Company") {
				return "Dear Ladies and Gentlemen";
			} 
			else 
			{
				if ($Partner.Title.toString() != "")	
				{
					return "Dear " + $Partner.Salutation + " " + $Partner.Title + " " + $Partner.Lastname;
				}
				else
				{
					return "Dear " + $Partner.Salutation + " " + $Partner.Lastname;
				}
			}
		} 
		else {
			return "Dear " + $Partner.SalutatoryAddress;
		}
	}	 
}


function deriveNameFirstname($Partner) {
	if ($Partner.CompanyName1 && !$Partner.CompanyName1.isEmpty()) {
		return $Partner.CompanyName1;
	}
	else {
		var name = $Partner.Lastname;
		if ($Partner.Firstname && !$Partner.Firstname.isEmpty()) {
			name = name + ", " + $Partner.Firstname;
		}
		if ($Partner.title && !$Partner.title.isEmpty()) {
			name = $Partner.title+ " " + name;
		}
		return name;
	}	
}