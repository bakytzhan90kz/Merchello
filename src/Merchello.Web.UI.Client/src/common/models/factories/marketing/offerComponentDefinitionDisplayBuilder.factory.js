    /**
     * @ngdoc service
     * @name merchello.models.offerComponentDefinitionDisplayBuilder
     *
     * @description
     * A utility service that builds OfferComponentDefinitionDisplay models
     */
    angular.module('merchello.models').factory('offerComponentDefinitionDisplay',
        ['genericModelBuilder', 'extendedDataDisplayBuilder', 'dialogEditorViewDisplayBuilder', 'OfferComponentDefinitionDisplay',
        function(genericModelBuilder, extendedDataDisplayBuilder, dialogEditorViewDisplayBuilder, OfferComponentDefinitionDisplay) {

            var Constructor = OfferComponentDefinitionDisplay;

            return {
                createDefault: function() {
                    var definition = new Constructor();
                    definition.extendedData = extendedDataDisplayBuilder.createDefault();
                    return definition;
                },
                transform: function(jsonResult) {
                    var definitions = [];
                    if(angular.isArray(jsonResult)) {
                        for(var i = 0; i < jsonResult.length; i++) {
                            var definition = genericModelBuilder.transform(jsonResult[ i ], Constructor);
                            definition.extendedData = extendedDataDisplayBuilder.transform(jsonResult[ i ].extendedData);
                            definition.editorView = dialogEditorViewDisplayBuilder.transform(jsonResult[ i ].editorView);
                            definitions.push(definition);
                        }
                    } else {
                        definitions = genericModelBuilder.transform(jsonResult[ i ], Constructor);
                        definitions.extendedData = extendedDataDisplayBuilder.transform(jsonResult[ i ].extendedData);
                        definitions.editorView = dialogEditorViewDisplayBuilder.transform(jsonResult[ i ].editorView);
                    }
                    return definitions;
                }
            };
        }]);