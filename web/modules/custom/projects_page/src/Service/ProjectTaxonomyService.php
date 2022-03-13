<?php

namespace Drupal\projects_page\Service;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\image\Entity\ImageStyle;

class ProjectTaxonomyService {

  /** @var Drupal\Core\Entity\EntityTypeManagerInterface */
  protected $entity_type_manager;

  public function __construct(EntityTypeManagerInterface $entity_type_manager) {
    $this->entity_type_manager = $entity_type_manager;
  }

  public function getAttributes() {
    $terms = $this->entity_type_manager
      ->getStorage('taxonomy_term')
      ->loadByProperties([
        'vid' => 'project_attributes',
      ]);

    $data = [];

    /** @var \Drupal\taxonomy\TermInterface $term */
    foreach ($terms as $term) {
      $data[] = [
        'id' => $term->id(),
        'name' => $term->getName()
      ];
    }

    return $data;
  }

  public function getSustainableDevelopmentGoals() {
    $terms = $this->entity_type_manager
      ->getStorage('taxonomy_term')
      ->loadByProperties([
        'vid' => 'sustainable_development_goals',
      ]);

    $data = [];

    /** @var \Drupal\taxonomy\TermInterface $term */
    $image_style = ImageStyle::load('extra_small');
    $tempCounter = 1;
    foreach ($terms as $id => $term) {
      $field_pictogram_entity = $term->get('field_pictogram')->entity;
      if (!empty($field_pictogram_entity)) {
        $image_uri = $field_pictogram_entity->field_media_image->entity->getFileUri();
        $image_url = $image_style->buildUrl($image_uri);
        $image_alt = $field_pictogram_entity->field_media_image->alt;
      }

      $data[] = [
        'id' => $id,
        'name' => $term->getName(),
        'image_url' => $image_url,
        'image_alt' => $image_alt,

        /*
         💥 FIXME this is for development purposes until the DB has been updated.
         Use `image_url` instead that is attached to the taxonomy.
         */
        'imgSrc' => '/modules/custom/projects_page/app/images/sdg' . str_pad($tempCounter++, 2, "0", STR_PAD_LEFT) . '.png'
      ];
    }

    return $data;
  }
}
